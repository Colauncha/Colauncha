
export interface Data {
    id: number,
    title:string,
    body: string,
    img: string,
}




export const data = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid nihil neque atque officia tempore, quasi enim optio inventore delectus fugit mollitia! Minima beatae fugiat voluptate vero aspernatur qui. Nesciunt, quos.",
    img: "",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid nihil neque atque officia tempore, quasi enim optio inventore delectus fugit mollitia! Minima beatae fugiat voluptate vero aspernatur qui. Nesciunt, quos.",
    img: "",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid nihil neque atque officia tempore, quasi enim optio inventore delectus fugit mollitia! Minima beatae fugiat voluptate vero aspernatur qui. Nesciunt, quos.",
    img: "",
  },
];



function getData(){
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      const data1 = resolve(data)
      console.log(data1);
      

    },2000)
  })
}
 
getData()