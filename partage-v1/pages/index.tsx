import { useState, useEffect } from "react";
import Head from "next/head";

export default function Home() {
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState(5);
  const [userData, setUserData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do Stacks things
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Partage - Shared NFT Utilities </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold mb-24">Sup</h1>
        <form onSubmit={handleSubmit}>
          <p>
            Say
            <input
              className="p-6 border rounded mx-2"
              type="text"
              value={message}
              onChange={handleMessageChange}
              placeholder="something"
            />
            for
            <input
              className="p-6 border rounded mx-2"
              type="number"
              value={price}
              onChange={handlePriceChange}
            />{" "}
            STX
          </p>
          <button
            type="submit"
            className="p-6 bg-green-500 text-white mt-8 rounded"
          >
            Post Message
          </button>
        </form>
      </main>
    </div>
  );
}