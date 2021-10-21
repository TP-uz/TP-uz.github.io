let clock = document.querySelector("#real_time");

let getRealTime = () => {
  let date = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  let d = days[date.getUTCDay()];

  let h_ = "";
  let m_ = "";
  let s_ = "";

  if (h < 10) {
    h_ = "0" + h;
  } else {
    h_ = h;
  }
  if (m < 10) {
    m_ = "0" + m;
  } else {
    m_ = m;
  }
  if (s < 10) {
    s_ = "0" + s;
  } else {
    s_ = s;
  }

  let time = h_ + ":" + m_ + ":" + s_ + " " + d;

  return time;
};

setInterval(function () {
  clock.innerHTML = getRealTime();
}, 1000);

let loadConversations = async (email) => {
  let currentEmail = email.trim()

  document.querySelector("#currentEmail").innerHTML = currentEmail;

  let result = await firebase.firestore().collection('chat').where('user', 'array-contains', currentEmail).get();
  let data = getDataFromDocs(result.docs)
  console.log(data);
  renderChat(data[0], currentEmail)
  renderListUsers(data, currentEmail)

};
let renderChat = (data, email) => {
  let dom = document.querySelector(".chat_content");
  let chat_name = document.querySelector("#currentName")
  let chat_id = document.querySelector("#currentId")
  chat_name.innerHTML = data.name
  chat_id.innerHTML = data.id
  dom.innerHTML = ''
  console.log(data);
  for (let i = 0; i < data.messages.length; i++) {
    let chatClass = "message";
    if (data.messages[i].owner == email) {
      chatClass = "message onwer";
    }
    let html = `<div class="${chatClass}">
    <div class="message_info">
      <span style="margin-right: 15px">${data.messages[i].owner}</span>
      <span>${data.messages[i].time}</span>
    </div>
    <span class="content_m">${data.messages[i].content}</span>
  </div>`;
    dom.innerHTML += html;
  }

}
let getDataFromDoc = (doc) => {
  let data = doc.data()
  data.id = doc.id
  return data

}

let getDataFromDocs = (docs) => {
  let result = []
  for (let doc of docs) {
    let data = getDataFromDoc(doc)
    result.push(data)
  }
  return result
}
let signOut = () => {
  firebase.auth().signOut().then(() => {
    open("../index.html", "_self");
  }).catch((error) => {
    alert("Sign Out Error")
  });
}
window.onload = init

async function init() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const email = user.email;
      loadConversations(email)
      handleConversationChange(email)

    } else {
      Swel("You need to sign in before using the chat")
      setTimeout(function () {
        open("../index.html", "_self");
      }, 3000);
    }
    // console.log(user);
  })
}
let Swel = (content) => {
  let timerInterval
  Swal.fire({
    title: content,
    html: 'This will close in <b></b> milliseconds.',
    timer: 3000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
      const b = Swal.getHtmlContainer().querySelector('b')
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('I was closed by the timer')
    }
  })
}
let renderListUsers = (data, email) => {
  let dom = document.querySelector(".userlist")
  console.log(dom);
  dom.innerHTML = ""
  for (let i = 0; i < data.length; i++) {
    let html = `<div id="c${data[i].id}" class="user">
    <span id="nameAndAvatar"><img src="https://picsum.photos/536/354"></i>${data[i].name}</span>
    <h4 id="real_timer">...<h4>
</div>`;
    dom.innerHTML += html
  }
  for (let i = 0; i < data.length; i++) {
    document.querySelector(`#c${data[i].id}`).addEventListener("click", () => {
      renderChat(data[i], email)
    })
  }
}

let formInputMessage = document.querySelector("#sendMessage");

formInputMessage.onsubmit = (e) => {
  e.preventDefault();
  let currentEmail = document.querySelector("#currentEmail").innerHTML;
  let currentId = document.querySelector("#currentId").innerHTML;

  let message = formInputMessage.m.value;
  // console.log(message);
  // console.log(currentEmail);
  // console.log(currentId);


  updateMessage(message, currentEmail, currentId);
  formInputMessage.m.value = "";
};

let updateMessage = async (messageContent, currenEmail, currentId) => {
  let message = {
    content: messageContent,
    owner: currenEmail,
    time: getRealTime(),
  };

  await firebase
    .firestore()
    .collection("chat")
    .doc(currentId)
    .update({
      messages: firebase.firestore.FieldValue.arrayUnion(message),
    });
};
let handleConversationChange = async (email) => {
  let skipRun = true;
  let currentEmail = email;
  console.log(currentEmail);
  firebase
    .firestore()
    .collection("chat")
    .where("users", "array-contains", currentEmail)
    .onSnapshot(function (snapshot) {
      if (skipRun) {
        skipRun = false;
        return;
      }

      let docChanges = snapshot.docChanges();
      for (let docChange of docChanges) {
        let type = docChange.type;
        let conversationDoc = docChange.doc;
        let conversation = getDataFromDoc(conversationDoc);
        console.log("llllllllllllll");

        if (type == "modified") {
          console.log("xxxxxx");
          renderChat(conversation, currentEmail);
        }
        if (type == "added") {
          setTimeout(function () {
            location.reload();
          }, 5000);
        }
      }
    });
};