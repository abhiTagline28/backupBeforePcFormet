/*


// Pubg (02-07-2021)

DetailsPresentation.jsx


// MyClan

ONLINE LINK : -   https://xd.adobe.com/view/6877ad3c-6139-4166-b25a-75bda50d9460-3d24/screen/3c99eef7-dc82-445e-890c-7887764d9bef/specs/

import React,{useEffect, useState} from 'react'
import CustomButton from "../reusable/CustomButton"
import Loader from '../reusable/Loader';
import CustomInput from "../reusable/CustomInput"
import bgPlaceholder from "../assets/images/avatar-placeholder.jpg";

const DetailsPresentation = ({ listData, searchString, textChange, storeDataList, flagL, flagB,
    selectHandle, inviteHandle, loader, invitedMember, backHandle, clanDetaisCom, hidden }) => {
        const [img, setImg] = useState('')
        const [imgVal,setImgVal] = useState(false)
        console.log("searchString : ",searchString);
        // useEffect(() => {
        //     storeDataList.map((item)=>{
        //         if(item.name === searchString){
        //             console.log("Yes Matched");
        //             setImg(item.logo)
        //         }
        //         else{
        //             console.log("Not Matched");
        //             setImg('')
        //         }
        //     })
        //     setImgVal(false)
        // },[searchString])

useEffect(() => {
    storeDataList.map((item) => {
        if (item.name === searchString)
            setImg(item.logo)
        else
            setImg('')
    })
}, [imgVal, searchString])
console.log("imgVal : ", imgVal);
return (
    <>
        <div className="relative mb-4">
            {loader && <Loader />}
            {clanDetaisCom && <div>
                <CustomButton variant="contained" onClick={backHandle} color="primary">Back</CustomButton>
                <div>
                    <div>Host name : {listData.hostName}</div>
                    <div>Mode :{listData.mode}</div>
                    <div>No of clan per group  :{listData.noOfClansPerGroups}</div>
                    <div>No of Group  :{listData.noOfGroups}</div>
                    <div>No of member per group  :{listData.noOfmembersPerClan}</div>
                    <div>Prize  :{listData.prize}</div>
                    <div>Rules  :{listData.rules}</div>
                    <div>Type   :{listData.type}</div>
                </div>
            </div>
            }
            <img src={img ? process.env.REACT_APP_API_SERVER_URL + "/" + img : bgPlaceholder} className="w-10 h-10 rounded-full" alt="" />
            <CustomInput
                onChange={textChange}
                name="Search"
                inputLabel="Clan name"
                id="clan-name"
                type="search"
                value={searchString}
            />
            {flagB ? <></> : <>

                {
                    clanDetaisCom ? (invitedMember && invitedMember.map((data) => {
                        return (
                            <div key={data.id}>
                                {data.name}
                            </div>
                        )
                    })) : <>{invitedMember && <div>{invitedMember.name}</div>}</>
                }
                {clanDetaisCom && <CustomButton variant="contained" color="primary" onClick={inviteHandle}>Submit</CustomButton>}
            </>}
            <div className={`${searchString ? "" : "hidden"} ${hidden ? "hidden" : ''} absolute left-0 right-0 top-full z-10 shadow-md bg-white overflow-y-auto max-h-48`}>

                {storeDataList.length > 0 && (
                    <>
                        {searchString &&
                            <table className="w-full text-left">
                                <thead>
                                    <tr>
                                        <th className="p-3">Name</th>
                                        <th className="p-3">Select</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {storeDataList.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="p-3 border-b border-solid border-gray"><img className="w-10 h-10 rounded-full" src={item.logo !== null ? process.env.REACT_APP_API_SERVER_URL + "/" + item.logo : bgPlaceholder} alt="" /> {item.name}</td>
                                                {flagL ? <td className="p-3 border-b border-solid border-gray"><button className="focus:outline-none" type="button" onClick={() => {
                                                    selectHandle(item)
                                                    setImgVal(true)
                                                }}>Select</button></td> :
                                                    <td className="p-3 border-b border-solid border-gray"><button className="focus:outline-none" type="button" onClick={() => selectHandle(item)}>Invite</button></td>}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        }
                    </>
                )}
            </div>
        </div>


    </>
)
}

export default React.memo(DetailsPresentation)

* /