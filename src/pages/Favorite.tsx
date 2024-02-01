import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    TabsProps,
    TabsHeaderProps,
    TabsBodyProps
} from "@material-tailwind/react";
import React, { useState } from "react";

function Favorite() {
    const [activeTab, setActiveTab] = useState("All");

    const data = [
        {
            label: "ALL",
            value: "all",
        },
        {
            label: "ARTIST",
            value: "artist",
        },
        {
            label: "DISCROGRAPHY",
            value: "discrography",
        },
    ];

    return (
        <div className="bg-base-100 h-screen w-screen">
            <Navbar></Navbar>
            <div className="pt-9 flex px-12 hd:px-24">
                <Link to="/" className="text-4xl text-neutral flex items-center w-1/3">
                    <span>{"<"}</span>
                    <span className="hidden hd:block">&nbsp;Home</span>
                </Link>
                <h1 className="text-6xl font-bold text-center overflow-hidden min-w-[33.33%] whitespace-nowrap">FAVORITE</h1>
                <div className="w-1/3"></div>
            </div>
            <div className="w-full flex justify-center">
                <Tabs value={activeTab}>
                    <TabsHeader
                        className="text-4xl w-1/2 gap-x-5 pt-4"
                        placeholder={undefined}
                    >
                        {data.map(({ label, value }) => (
                            <Tab
                                key={value}
                                value={value}
                                onClick={() => setActiveTab(value)}
                                className={`w-fit ${activeTab === value ? "text-info border-b-2 border-info" : "text-neutral opacity-50 hover:border-b-2 hover:border-info"}`}
                                placeholder={undefined}
                            >
                                {label}
                            </Tab>
                        ))}
                    </TabsHeader>
                </Tabs>
            </div>
        </div>
    )
}

export default Favorite;