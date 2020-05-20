import React, {useState, useEffect, useRef} from 'react';
import logo from './logo.svg';
import './App.css';


function App() {
  const [liff, setLiff] = useState("");

  // const client = LineClient.connect({
  //   accessToken: process.env.ACCESS_TOKEN,
  //   channelSecret: process.env.CHANNEL_SECRET,
  // });

  useEffect(() => {
    initialize();
  },[])

  function sendMessages(){
    fetch("http://localhost:9000/send-messages", {mode: 'cors'}).then(res => console.log(res));
  }

  function initialize(){
    let myLiffId = "";

    fetch('/send-id')
            .then(function(reqResponse) {
                console.log("reqResponse", reqResponse.body)
                return reqResponse.json();
            })
            .then(function(jsonResponse) {
              console.log("jsonresponseeee", jsonResponse);
                myLiffId = jsonResponse.id;
                initializeLiffOrDie(myLiffId);
            })
            .catch(function(error) {
                console.log(error);
            });
  }

  function initializeLiffOrDie(myLiffId) {
    if (!myLiffId) {
        // document.getElementById("liffAppContent").classList.add('hidden');
        // document.getElementById("liffIdErrorMessage").classList.remove('hidden');
    } else {
        initializeLiff(myLiffId);
    }
}


function initializeLiff(myLiffId) {
  console.log("myLIffidddd", myLiffId)
  window.liff.init({
          liffId: myLiffId
      })
      .then(() => {
          // start to use LIFF's api
          initializeApp();
      })
      .catch((err) => {
        console.log(err);
          // document.getElementById("liffAppContent").classList.add('hidden');
          // document.getElementById("liffInitErrorMessage").classList.remove('hidden');
      });
}

function initializeApp() {
  // displayLiffData();
  // displayIsInClientInfo();
  // registerButtonHandlers();

  // check if the user is logged in/out, and disable inappropriate button
  if (window.liff.isLoggedIn()) {
      // document.getElementById('liffLoginButton').disabled = true;
  } else {
      // document.getElementById('liffLogoutButton').disabled = true;
  }
}

function　loginClick() {
  if (!window.liff.isLoggedIn()) {
      // set `redirectUri` to redirect the user to a URL other than the front page of your LIFF app.
      
      //window.liff.login({ redirectUri: "http://localhost:3000" });
      
       window.liff.login();
  }
};

  return (
    <div className="App">
      <div id="liffAppContent">
            {/* <!-- ACTION BUTTONS --> */}
            <div className="buttonGroup">
                <div className="buttonRow">
                    <button id="openWindowButton">Open External Window</button>
                    <button id="closeWindowButton">Close LIFF App</button>
                </div>
                <div className="buttonRow">
                    <button id="scanQrCodeButton">Open QR Code Reader</button>
                    <button id="sendMessageButton" onClick={()=> sendMessages()}>Send Message</button>
                </div>
                <div className="buttonRow">
                    <button id="getAccessToken">Get Access Token</button>
                    <button id="getProfileButton">Get Profile</button>
                </div>
            </div>
            <div id="shareTargetPickerMessage"></div>
            {/* <!-- ACCESS TOKEN DATA --> */}
            <div id="accessTokenData" className="hidden textLeft">
                <h2>Access Token</h2>
                <a href="#">Close Access Token</a>
                <table>
                    <tr>
                        <th>accessToken</th>
                        <td id="accessTokenField"></td>
                    </tr>
                </table>
            </div>
            {/* <!-- SCAN QR RESULT --> */}
            <div id="scanQr" className="hidden textLeft">
                <h2>QR Code reader</h2>
                <a href="#">Close QR Code Reader Result</a>
                <table>
                    <tr>
                        <th>scanCode Result</th>
                        <td id="scanQrField"></td>
                    </tr>
                </table>
            </div>
            {/* <!-- PROFILE INFO --> */}
            <div id="profileInfo" className="hidden textLeft">
                <h2>Profile</h2>
                <a href="#">Close Profile</a>
                <div id="profilePictureDiv">
                </div>
                <table>
                    <tr>
                        <th>userId</th>
                        <td id="userIdProfileField"></td>
                    </tr>
                    <tr>
                        <th>displayName</th>
                        <td id="displayNameField"></td>
                    </tr>
                    <tr>
                        <th>statusMessage</th>
                        <td id="statusMessageField"></td>
                    </tr>
                </table>
            </div>
            {/* <!-- LOGIN LOGOUT BUTTONS --> */}
            <div className="buttonGroup">
                <button id="liffLoginButton" onClick={() => loginClick()}>Log in</button>
                {/* <button id="liffLoginButton" >Log in</button> */}
                <button id="liffLogoutButton">Log out</button>
            </div>
            <div id="statusMessage">
                <div id="isInClientMessage"></div>
                <div id="apiReferenceMessage">
                    <p>Available LIFF methods vary depending on the browser you use to open the LIFF app.</p>
                    <p>Please refer to the <a href="https://developers.line.biz/en/reference/liff/#initialize-liff-app">API reference page</a> for more information.</p>
                </div>
            </div>
        </div>
        {/* <!-- LIFF ID ERROR --> */}
        <div id="liffIdErrorMessage" className="hidden">
            <p>You have not assigned any value for LIFF ID.</p>
            <p>If you are running the app using Node.js, please set the LIFF ID as an environment variable in your Heroku account follwing the below steps: </p>
            <code id="code-block">
                <ol>
                    <li>Go to `Dashboard` in your Heroku account.</li>
                    <li>Click on the app you just created.</li>
                    <li>Click on `Settings` and toggle `Reveal Config Vars`.</li>
                    <li>Set `MY_LIFF_ID` as the key and the LIFF ID as the value.</li>
                    <li>Your app should be up and running. Enter the URL of your app in a web browser.</li>
                </ol>
            </code>
            <p>If you are using any other platform, please add your LIFF ID in the <code>index.html</code> file.</p>
            <p>For more information about how to add your LIFF ID, see <a href="https://developers.line.biz/en/reference/liff/#initialize-liff-app">Initializing the LIFF app</a>.</p>
        </div>
        {/* <!-- LIFF INIT ERROR --> */}
        <div id="liffInitErrorMessage" className="hidden">
            <p>Something went wrong with LIFF initialization.</p>
            <p>LIFF initialization can fail if a user clicks "Cancel" on the "Grant permission" screen, or if an error occurs in the process of <code>liff.init()</code>.</p>
        </div>
        {/* <!-- NODE.JS LIFF ID ERROR --> */}
        <div id="nodeLiffIdErrorMessage" className="hidden">
            <p>Unable to receive the LIFF ID as an environment variable.</p>
        </div>
    </div>
  );
}

export default App;
