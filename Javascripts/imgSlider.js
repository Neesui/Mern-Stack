const imgArray = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpeg"];
const arrayLength = imgArray.length;

let i = 0;

const right = document.querySelector(".right");
const left = document.querySelector(".left");

right.addEventListener("click", () => {
  i++;
  i = i % arrayLength;
  document.querySelector("container img").src = `images/${imgArray[i]}`;
});

left.addEventListener("click", () => {
  i--;
  i = (i + arrayLength) % arrayLength;
  document.querySelector(".container img").src = `images/${imgArray[i]}`;
});

let set = setInterval(demoFunction,4000)

document.write.querySelector("container .right").addEventListener('click',()=>{
  i++
  i=i%arrayLength
  document.querySelector('img').src = `images/${imgArray[i]}`;
})

document.write.querySelector("container .left").addEventListener('click',()=>{
  i--
if(i<0){
  i=arrayLength-1
}
  document.querySelector('img').src = `images/${imgArray[i]}`;
})

document.write.querySelector("container").addEventListener('mouseover',()=>{
  clearInterval(set)
})
document.write.querySelector('container').addEventListener('mouseout',()=>{
  cument.querySelector(".container").addEventListener('mouseout', () => {
    set = setInterval(() => {
      i++;
      i = i % arrayLength;
      updateImage();
    }, 4000);
})