import { displayAdminMessage } from "./utilities"

const fetchData = async ( url, method, wpRestNonce, body = null, prefix ) => {

  let response

  try {

    if ( body ) {

      response = await fetch( url, {
        method: method,
        body: body,
        headers: {'X-WP-Nonce': wpRestNonce }
      } )

    } else {

      response = await fetch( url, {
        method: method,
        headers: {'X-WP-Nonce': wpRestNonce }
      } )

    }

    const jsonRes = await response.json();
    // console.log("JSONRES", jsonRes)

    // Bail is server response status = error
    if (response.status !== 200 ) throw new Error( jsonRes.message )

    return jsonRes

  } catch (error) {
    displayAdminMessage(error.message, "error",  prefix)
    console.log("CAUGHT ERROR", error)
  }

}

export default fetchData
