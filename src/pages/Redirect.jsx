import React from 'react';

export default function Redirect() { 
    let url = window.location.pathname;
    url = url.slice(9)
    return (
        <h1>Loading... Redirecting you shortly</h1>
    )
}