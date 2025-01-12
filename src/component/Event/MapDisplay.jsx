import React, { useEffect, useState } from "react";

function MapDisplay({ mapLink }) {
    return (
        <div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.9987552445964!2d73.807349474962!3d18.483715582602645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bff7b21a6c09%3A0x41e90a14f27b770!2sIDEA%20Foundation%20Pune!5e0!3m2!1sen!2sin!4v1736008167861!5m2!1sen!2sin" width="600" height="450"  allowfullscreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
    );
}
export default MapDisplay;
