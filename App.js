
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
// import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES } from "@web3auth/base";
const clientId ="BBTDdCGK9lFJoYUzABNqUabweuvVQd2FXwSzLEAiDg7TEVT_I9gdma1DprThaTFTznYDU7ONSDGPVm8BZ_MfjSM";

function App() {
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x13881",
            rpcTarget: "https://rpc-mumbai.maticvigil.com/",
          },
        });

        setWeb3auth(web3auth);
        
        await web3auth.initModal();
        
        setProvider(web3auth.provider);
      } catch (error) {
        console.log(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    
    const web3authProvider = await web3auth.connect();
    
    setProvider(web3authProvider);
  };
  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
  }
  return (
    <div>
    <div>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
    </div>

  );
}

export default App;


