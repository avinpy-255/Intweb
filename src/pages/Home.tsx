import CreateRoom from "@/functions/CreateRoom";
import "../assets/fonts/CosmicDream/AppleGaramond.ttf";
import JoinRoom from "@/functions/JoinRoom";


function Home() {

  return (
   
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
      <h1 className="text-9xl text-black" style={{ fontFamily: "Apple" }}>
        Cosmic Code
      </h1>
      <CreateRoom />
      <JoinRoom/>
    </div>
 

  );
}

export default Home;
