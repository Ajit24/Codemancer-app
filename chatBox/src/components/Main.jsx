import { useEffect, useState } from "react";
import axios from "axios";
import "./Main.css"
export const Main = () => {
  
  // create state for app

  const [post, setPost] = useState("");
  const [newGif, setnewGif] = useState("");
  const [displaydata, setDisplaydata] = useState([]);
  const [gifydata, setgifydata] = useState([]);
  

  useEffect(() => {
    getgifydata();
  }, [newGif]);

  // ------------ showing random gif items ---------------------
  const randomGify = () => {
    axios
      .get(
        `https://api.giphy.com/v1/stickers/trending?api_key=nr8XmV69fFVJyrtLemHNFEfcRo93yOMY&limit=6`
      )
      .then((res) => setgifydata(res.data.data));
  };

  // ------------------ giphy data to post with messages -----------------
  const getgifydata = () => {
    if (!newGif) return;
    axios
      .get(
        `https://api.giphy.com/v1/gifs/search?api_key=Yy8nu8Ko7ASM2Cm4dqJIHy9wE0h9sv9n&q=${newGif}&limit=20&offset=5&rating=g&lang=en`
      )
      .then((res) => setgifydata(res.data.data));
  };

  // --------- To clear the data of input 
  const clear = (e) => {
    if (e.key === "Backspace") {
      setgifydata([]);
    }
  };
  console.log(displaydata, "displaydata");
  //  console.log("ajit", "displaydata");

   // ----------- returning all UI related codes ----------------
  return (
    <div className="mainDiv">
      <div className="App">
        <h2>CodeMancers-App</h2>
      </div>

      <div className="mainDiv2">
       
        <div className="postDiv1">
          <div className="postInpDiv">
            <img className="avatar" src="./blank-profile.webp" alt="user-img" />
            <input
              value={post}
              onChange={(e) => setPost(e.target.value)}
              type="text"
              placeholder="Type something here..."
            />
          </div>

          {/* // ----------------button-div ------------------ */}
          <div className="buttons_div">
            <div className="buttons_inside_div">
            
              <button
                onClick={() =>
                  (document.getElementsByClassName("modal")[0].style.display =
                    "block")(randomGify())
                }
              >
                <img
                  style={{ marginRight: "5px" }}
                  src="./gif.png"
                  width={"15px"}
                  height={"10px"}
                  alt=" gify"
                />
                Gif
              </button>
             {/* // --------- button for POST ------------------- */}
              <button>
                POST
              </button>
            </div>

{/* // ---------- search gify to post --------------------- */}
            <div class="modal">
              <div className="modal-content">
                <input
                  type="text"
                  placeholder="Search"
                  onChange={(e) => setnewGif(e.target.value)}
                  onKeyDown={(e) => clear(e)}
                />

                <div
                  className="gif_content"
                  onClick={() =>
                    (document.getElementsByClassName("modal")[0].style.display =
                      "none")(setPost(""))
                  }
                >
                  {gifydata.map((el) => (
                    <>
                      <img
                        onClick={() => {
                          let obj = {
                            Post_name: post,
                            Gif_url: el.images.fixed_height.url,
                          };
                          setDisplaydata([...displaydata, obj]);
                        }}
                        src={el.images.fixed_height.url}
                        width={"90%"}
                        height={"200px"}
                        alt=""
                      />
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {gifydata.length !== 0 ? (
            <div className="upload_post_div">
              {displaydata.map((el) => (
                <>
                  <div className="header_div">
                    <img src="./blank-profile.webp" alt="" />
                    <p>{el.Post_name}</p>
                  </div>
                  <div className="gif_container">
                    <img src={el.Gif_url} width={"90%"} height={"90%"} alt="" />
                  </div>
                </>
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};
