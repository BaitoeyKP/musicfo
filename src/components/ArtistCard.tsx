import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { artistType } from "../Type";
import { Link } from "react-router-dom";

function ArtistCard({ name, genre, id, images }: artistType) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [cookies, setCookie] = useCookies<string>([]);
    const [checked, setChecked] = useState(cookies[id].data);
    const [cardHeight, setCardHeight] = useState(0);
    const frontRef = useRef<HTMLDivElement>(null);

    const handleFlipF = () => {
        setIsFlipped(false);
        console.log("front");

    };
    const handleFlipB = () => {
        setIsFlipped(true);
        console.log("back");

    };

    useEffect(() => {
        const isChecked = cookies[id].data;
        if (isChecked === 'true') {
            setChecked(true);
        }
    }, []);

    const handleChange = () => {
        setChecked(!checked);
        setCookie(id, { data: !checked, type: "artist" }); // Expires in 7 days
    };
    console.log(checked);

    useEffect(() => {
        const updateCardHeight = () => {
            const frontCardHeight = frontRef.current?.clientHeight;
            if (frontCardHeight) {
                setCardHeight(frontCardHeight);
            }
        };
        updateCardHeight();
        window.addEventListener('resize', updateCardHeight);
        return () => {
            window.removeEventListener('resize', updateCardHeight);
        };
    }, [checked]);
    console.log(cardHeight);
    

    return (
        <div className="h-full w-full">
            {/* front */}
            <div
                ref={frontRef}
                className={`bg-neutral bg-opacity-25 p-4 rounded-3xl flex flex-col justify-between ${isFlipped ? 'hidden' : ''}`}
            >
                <Link to={`/discography/${name}/${id}`} className="flex flex-col justify-around w-full gap-y-3" onMouseOver={handleFlipB}>
                    <img
                        src={images}
                        className="rounded-lg"
                        alt=""
                    />
                    <h2 className="font-bold text-5xl max-w-full truncate pb-2">
                        {name}
                    </h2>
                </Link>
                <div className="flex justify-end">
                    <label className="swap swap-flip">
                        <input type="checkbox" checked={checked} onChange={handleChange} />
                        <div className="swap-on">
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none" className="text-info w-9">
                                <g clip-path="url(#clip0_11_370)">
                                    <path d="M26.2467 2C24.5583 2.02626 22.9067 2.49758 21.4587 3.36636C20.0108 4.23513 18.8177 5.4706 18 6.948C17.1823 5.4706 15.9892 4.23513 14.5413 3.36636C13.0933 2.49758 11.4417 2.02626 9.75333 2C7.06182 2.11694 4.52599 3.29436 2.69985 5.27503C0.873698 7.2557 -0.0943261 9.87861 0.00725873 12.5707C0.00725873 19.3885 7.18336 26.8345 13.2019 31.8829C14.5457 33.0122 16.2447 33.6313 18 33.6313C19.7553 33.6313 21.4543 33.0122 22.7981 31.8829C28.8166 26.8345 35.9927 19.3885 35.9927 12.5707C36.0943 9.87861 35.1263 7.2557 33.3002 5.27503C31.474 3.29436 28.9382 2.11694 26.2467 2Z"
                                        fill="currentColor" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_11_370">
                                        <rect width="36" height="36" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div className="swap-off">
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none" className="text-info w-9">
                                <path d="M26.2467 2C24.5583 2.02626 22.9067 2.49758 21.4587 3.36636C20.0108 4.23513 18.8177 5.4706 18 6.948C17.1823 5.4706 15.9892 4.23513 14.5413 3.36636C13.0933 2.49758 11.4417 2.02626 9.75333 2C7.06182 2.11694 4.52599 3.29436 2.69985 5.27503C0.873698 7.2557 -0.0943261 9.87861 0.00725873 12.5707C0.00725873 19.3885 7.18336 26.8345 13.2019 31.8829C14.5457 33.0122 16.2447 33.6313 18 33.6313C19.7553 33.6313 21.4543 33.0122 22.7981 31.8829C28.8166 26.8345 35.9927 19.3885 35.9927 12.5707C36.0943 9.87861 35.1263 7.2557 33.3002 5.27503C31.474 3.29436 28.9382 2.11694 26.2467 2ZM20.8713 29.5889C20.0676 30.2657 19.0507 30.6368 18 30.6368C16.9493 30.6368 15.9324 30.2657 15.1287 29.5889C7.42477 23.125 3.00605 16.9235 3.00605 12.5707C2.90355 10.6736 3.55538 8.81285 4.81936 7.39437C6.08335 5.9759 7.85694 5.11477 9.75333 4.99879C11.6497 5.11477 13.4233 5.9759 14.6873 7.39437C15.9513 8.81285 16.6031 10.6736 16.5006 12.5707C16.5006 12.9684 16.6586 13.3498 16.9398 13.631C17.221 13.9122 17.6023 14.0701 18 14.0701C18.3977 14.0701 18.779 13.9122 19.0602 13.631C19.3414 13.3498 19.4994 12.9684 19.4994 12.5707C19.3969 10.6736 20.0487 8.81285 21.3127 7.39437C22.5767 5.9759 24.3503 5.11477 26.2467 4.99879C28.1431 5.11477 29.9167 5.9759 31.1806 7.39437C32.4446 8.81285 33.0965 10.6736 32.9939 12.5707C32.9939 16.9235 28.5752 23.125 20.8713 29.5829V29.5889Z"
                                    fill="currentColor" />
                            </svg>
                        </div>
                    </label>
                </div>
            </div>
            {/* back */}
            <div
                className={`bg-neutral bg-opacity-25 p-4 rounded-3xl flex flex-col justify-between w-full h-full ${isFlipped ? '' : 'hidden'}`}
                onMouseOver={handleFlipB}
                onMouseOut={handleFlipF}
                style={{ height: `${cardHeight}px` }}
            >
                <div className="overflow-hidden max-h-96 cursor-context-menu">
                    <h2 className="font-bold text-5xl hyphens-auto leading-tight">
                        {name}
                    </h2>
                    <p className="text-4xl font-medium py-4">
                        {genre.join(', ')}
                    </p>
                </div>
                <div className="flex gap-x-2">
                    <Link to={`/discography/${name}/${id}`} className="btn btn-outline text-xl w-[48%]">Read more</Link>
                    <button className="btn text-xl w-[48%] border-info bg-transparent hover:border-info" onClick={handleChange}>
                        <label className="swap swap-flip">
                            <input type="checkbox" checked={checked} onChange={handleChange} />
                            <div className="swap-on">
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none" className="text-info w-9 h-fit">
                                    <g clip-path="url(#clip0_11_370)">
                                        <path d="M26.2467 2C24.5583 2.02626 22.9067 2.49758 21.4587 3.36636C20.0108 4.23513 18.8177 5.4706 18 6.948C17.1823 5.4706 15.9892 4.23513 14.5413 3.36636C13.0933 2.49758 11.4417 2.02626 9.75333 2C7.06182 2.11694 4.52599 3.29436 2.69985 5.27503C0.873698 7.2557 -0.0943261 9.87861 0.00725873 12.5707C0.00725873 19.3885 7.18336 26.8345 13.2019 31.8829C14.5457 33.0122 16.2447 33.6313 18 33.6313C19.7553 33.6313 21.4543 33.0122 22.7981 31.8829C28.8166 26.8345 35.9927 19.3885 35.9927 12.5707C36.0943 9.87861 35.1263 7.2557 33.3002 5.27503C31.474 3.29436 28.9382 2.11694 26.2467 2Z"
                                            fill="currentColor" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_11_370">
                                            <rect width="36" height="36" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <div className="swap-off">
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none" className="text-info w-9 h-fit">
                                    <path d="M26.2467 2C24.5583 2.02626 22.9067 2.49758 21.4587 3.36636C20.0108 4.23513 18.8177 5.4706 18 6.948C17.1823 5.4706 15.9892 4.23513 14.5413 3.36636C13.0933 2.49758 11.4417 2.02626 9.75333 2C7.06182 2.11694 4.52599 3.29436 2.69985 5.27503C0.873698 7.2557 -0.0943261 9.87861 0.00725873 12.5707C0.00725873 19.3885 7.18336 26.8345 13.2019 31.8829C14.5457 33.0122 16.2447 33.6313 18 33.6313C19.7553 33.6313 21.4543 33.0122 22.7981 31.8829C28.8166 26.8345 35.9927 19.3885 35.9927 12.5707C36.0943 9.87861 35.1263 7.2557 33.3002 5.27503C31.474 3.29436 28.9382 2.11694 26.2467 2ZM20.8713 29.5889C20.0676 30.2657 19.0507 30.6368 18 30.6368C16.9493 30.6368 15.9324 30.2657 15.1287 29.5889C7.42477 23.125 3.00605 16.9235 3.00605 12.5707C2.90355 10.6736 3.55538 8.81285 4.81936 7.39437C6.08335 5.9759 7.85694 5.11477 9.75333 4.99879C11.6497 5.11477 13.4233 5.9759 14.6873 7.39437C15.9513 8.81285 16.6031 10.6736 16.5006 12.5707C16.5006 12.9684 16.6586 13.3498 16.9398 13.631C17.221 13.9122 17.6023 14.0701 18 14.0701C18.3977 14.0701 18.779 13.9122 19.0602 13.631C19.3414 13.3498 19.4994 12.9684 19.4994 12.5707C19.3969 10.6736 20.0487 8.81285 21.3127 7.39437C22.5767 5.9759 24.3503 5.11477 26.2467 4.99879C28.1431 5.11477 29.9167 5.9759 31.1806 7.39437C32.4446 8.81285 33.0965 10.6736 32.9939 12.5707C32.9939 16.9235 28.5752 23.125 20.8713 29.5829V29.5889Z"
                                        fill="currentColor" />
                                </svg>
                            </div>
                        </label>
                        Fav
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ArtistCard;