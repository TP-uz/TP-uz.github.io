let dom = document.getElementById("input_search")
console.log(dom);
dom.onsubmit = (e) => {
    e.preventDefault();
    let searchNameInput = dom.phat.value
    console.log(searchNameInput);


}
let searchNameInput = [
    {
        name: "cam",
        URL:"http://images6.fanpop.com/image/photos/34500000/Orange-Fruit-orange-34512931-1620-1080.jpg"
    }
,    {
        name: "tao",
        URL:"http://vilee.fi/eng/wp-content/uploads/2020/11/Do_Apples_Affect_Diabetes_and_Blood_Sugar_Levels-732x549-thumbnail-1-732x549-1.jpg"
    }
]