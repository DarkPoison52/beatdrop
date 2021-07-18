import "../styles/globals.css";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  if (router.pathname === "/") {
    return <Component {...pageProps} />;
  }

  return (
    <div>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossOrigin="anonymous"
      />
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossOrigin="anonymous"
      ></script>
      <style>
        {`a, a:hover, a:focus, a:active {
        text-decoration: none;
        color: inherit;
        }`}
      </style>
      <nav className="border-b p-6 flex flex-row justify-between">
        <Link href="/">
          <a className="text-4xl font-bold">beatdrop.</a>
        </Link>
        <div className="flex mt-4">
          <Link href="/marketplace">
            <a className="mr-4 text-blue-600">Marketplace</a>
          </Link>
          <Link href="/sell">
            <a className="mr-4 text-blue-600">Sell</a>
          </Link>
          <Link href="/purchased">
            <a className="mr-4 text-blue-600">Purchased</a>
          </Link>
          <Link href="/dashboard">
            <a className="mr-4 text-blue-600">Dashboard</a>
          </Link>
        </div>
      </nav>
      <Component {...pageProps} />

      <script
        src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"
        integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p"
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js"
        integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF"
        crossOrigin="anonymous"
      ></script>
    </div>
  );
}

export default MyApp;

// TODO: Create a landing page
/* Use hardhat node to create a network and  npx hardhat run scripts/deploy.js --network localhost to deploy*/
