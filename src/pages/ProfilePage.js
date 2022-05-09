import Nav from "../components/Nav";
import { Image } from "antd";

function ProfilePage() {
  return (
    <>
      <Nav />
      <div className="pt-[55px]">
        <div className="flex justify-center">
          <div className="w-[940px]">
            <div className="w-full">
              <Image
                width={"100%"}
                className="rounded-b-lg"
                src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
