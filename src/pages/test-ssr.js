import * as React from "react";
const SSRPage = () => (
  <main>
    <h1>SSR Page with Dogs</h1>
  </main>
);
export default SSRPage;
export async function getServerData() {}
