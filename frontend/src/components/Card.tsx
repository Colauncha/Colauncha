import { Button } from "./ui/button";

export interface CardProps {
  id: number;
  img: string;
  title: string;
  buttonColor: string;
  body? : string;
}

const Card:React.FC<CardProps> = ({ img, title, buttonColor, body }) => {
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
