let tinhToan = (id) => {

    let lop = document.querySelectorAll(`${id} input`)
    let lop_result = document.querySelector(`${id} strong`)
    let lop_xephang = document.querySelector(`${id} i`)


    for (let i = 0; i < lop.length; i++) {
        lop[i].addEventListener("change", () => {
            let tx1 = Number(lop[0].value)
            let tx2 = Number(lop[1].value)
            let tx3 = Number(lop[2].value)
            let gk1 = Number(lop[3].value)
            let hk1 = Number(lop[4].value)
            let gk2 = Number(lop[5].value)
            let hk2 = Number(lop[6].value)
            let result = (tx1 + tx2 + tx3 + (gk1 * 2) + (hk1 * 3) + (gk2 * 2) + (hk2 * 3)) / 13
            let str = result.toString()
            str = str.slice(0, 5)
            lop_result.textContent = str


            if (result > 8) {
                lop_xephang.textContent = "HSGiỏi";
            } else {
                lop_xephang.textContent = "Cần Cải Thiện Điểm Số";
            }




        })
    }
}


tinhToan("#l6")
tinhToan("#l7")
tinhToan("#l8")
tinhToan("#l9")