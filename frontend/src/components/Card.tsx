import { Button } from "./ui/button";

interface CardProps {
  title: string;
  img: string;
  body?: string;
  buttonColor?: string; // Now optional
}


const Card:React.FC<CardProps> = ({ img, title, body, buttonColor }) => {
  return (
    <div className="flex flex-col">
      <img src={img} alt="card_img" className="w-full" />
      <div className="flex justify-between m-6 gap-6">
      <div className="font-bold">{title}</div>
     
       <div>
       {buttonColor ? (
          <Button className={`${buttonColor ? buttonColor : "bg-red-500"}`}>
            View
          </Button>
        ) : (
        body
        )}
       </div>
      </div>
    </div>
  );
};

export default Card;
