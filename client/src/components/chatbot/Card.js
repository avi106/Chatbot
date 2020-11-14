import React from 'react';

const Card = (props) => {
    console.log("This is data from cards" , props)
    return (
        <div style={{ width: 270, paddingRight: 30, float: "left"}}>
            <div className="card">
                <div className="card-image" style={{ width: 240}}>
                    <img alt={props.payload.fields.header.stringValue} src={props.payload.fields.image.stringValue}>
                        <span className="card-title">{props.payload.fields.header.stringValue}</span>
                    </img>
                </div>
                <div className="card-content">
                    {props.payload.fields.description.stringValue}
                </div>
                <div className="card-action">
                    <a target="_blank" rel="noopener noreferer" href={props.payload.fields.link.stringValue}>Learn More.</a>
                </div>

            </div>
            
        </div>
    )
}

export default Card;
 