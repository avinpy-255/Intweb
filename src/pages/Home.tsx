import CreateRoom from "@/functions/CreateRoom";
import "../assets/fonts/CosmicDream/AppleGaramond.ttf";
import "./Home.css";

function Home() {

  return (
    <article className="wrapper">
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
      <h1 className="text-9xl text-black" style={{ fontFamily: "Apple" }}>
        Cosmic Code
      </h1>
      <CreateRoom/>
    </div>
  </article>

  );
}

export default Home;
