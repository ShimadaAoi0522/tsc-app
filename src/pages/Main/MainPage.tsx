import { createRef, useMemo, useRef, useState } from "react"
import TinderCard from "react-tinder-card"

import db from "../../../db/db.json"
import "./MainPage.css"

type Direction = "left" | "right" | "up" | "down"

type TinderCardRef = {
    swipe: (direction?: Direction) => Promise<void>
    restoreCard: () => Promise<void>
}

type CultureSpot = {
    name: string
    plase: string
    time_begin: string
    time_end: string
    price: number
    explanation: string
    image: string
}

type CultureCard = CultureSpot & {
    imageUrl: string
}

const imageModules = import.meta.glob("../../../db/image/*", {
    eager: true,
    import: "default",
    query: "?url",
}) as Record<string, string>

const formatPrice = (price: number) => {
    if (price === 0) {
        return "無料"
    }

    return new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "JPY",
        maximumFractionDigits: 0,
    }).format(price)
}

const getImageUrl = (imagePath: string) => {
    const normalizedPath = imagePath.replace(/^\.\//, "")
    return imageModules[`../../../db/${normalizedPath}`] ?? imagePath
}

const cultureCards: CultureCard[] = (db as CultureSpot[]).map((spot) => ({
    ...spot,
    imageUrl: getImageUrl(spot.image),
}))

function MainPage() {
    const [lastDirection, setLastDirection] = useState<Direction>()
    const [currentIndex, setCurrentIndex] = useState(cultureCards.length - 1)
    const currentIndexRef = useRef(currentIndex)
    const childRefs = useMemo(
        () => cultureCards.map(() => createRef<TinderCardRef>()),
        [],
    )

    const updateCurrentIndex = (value: number) => {
        setCurrentIndex(value)
        currentIndexRef.current = value
    }

    const canGoBack = currentIndex < cultureCards.length - 1
    const canSwipe = currentIndex >= 0
    const remainingCount = currentIndex + 1

    const swiped = (direction: Direction, index: number) => {
        setLastDirection(direction)
        updateCurrentIndex(index - 1)
    }

    const outOfFrame = (index: number) => {
        if (currentIndexRef.current >= index) {
            void childRefs[index].current?.restoreCard()
        }
    }

    const swipe = async (direction: Direction) => {
        if (canSwipe && currentIndex < cultureCards.length) {
            await childRefs[currentIndex].current?.swipe(direction)
        }
    }

    const goBack = async () => {
        if (!canGoBack) {
            return
        }

        const nextIndex = currentIndex + 1
        updateCurrentIndex(nextIndex)
        await childRefs[nextIndex].current?.restoreCard()
    }

    const resetCards = async () => {
        await Promise.all(childRefs.map((ref) => ref.current?.restoreCard()))
        setLastDirection(undefined)
        updateCurrentIndex(cultureCards.length - 1)
    }

    const statusText = lastDirection
        ? lastDirection === "right"
            ? "気になる"
            : "見送り"
        : "未選択"

    return (
        <main className="main-page">
            <section className="main-shell" aria-labelledby="main-title">
                <header className="main-header">
                    <p className="main-kicker">TOKYO SWIPE CULTURES</p>
                    <h1 id="main-title">行き先カード</h1>
                    <div className="main-status" aria-live="polite">
                        <span>{remainingCount} / {cultureCards.length}</span>
                        <span>{statusText}</span>
                    </div>
                </header>

                <div className="swipe-area">
                    <div className="card-container">
                        <div className="empty-card" aria-hidden={canSwipe}>
                            <h2>確認完了</h2>
                            <p>カードがなくなりました</p>
                        </div>
                        {cultureCards.map((spot, index) => (
                            <TinderCard
                                ref={childRefs[index]}
                                className="swipe"
                                key={`${spot.name}-${spot.plase}-${index}`}
                                onSwipe={(direction) => swiped(direction, index)}
                                onCardLeftScreen={() => outOfFrame(index)}
                                preventSwipe={["up", "down"]}
                                swipeRequirementType="position"
                                swipeThreshold={90}
                            >
                                <article
                                    className="culture-card"
                                    style={{ zIndex: index }}
                                >
                                    <img
                                        className="culture-card-image"
                                        src={spot.imageUrl}
                                        alt={spot.name}
                                    />
                                    <div className="culture-card-body">
                                        <div>
                                            <h2>{spot.name}</h2>
                                            <p className="culture-card-place">{spot.plase}</p>
                                        </div>
                                        <p className="culture-card-text">{spot.explanation}</p>
                                        <dl className="culture-card-meta">
                                            <div>
                                                <dt>時間</dt>
                                                <dd>{spot.time_begin} - {spot.time_end}</dd>
                                            </div>
                                            <div>
                                                <dt>料金</dt>
                                                <dd>{formatPrice(spot.price)}</dd>
                                            </div>
                                        </dl>
                                    </div>
                                </article>
                            </TinderCard>
                        ))}
                    </div>

                    <div className="action-buttons">
                        <button
                            className="action-button action-pass"
                            type="button"
                            aria-label="見送り"
                            disabled={!canSwipe}
                            onClick={() => void swipe("left")}
                        >
                            <span aria-hidden="true">x</span>
                        </button>
                        <button
                            className="action-button action-back"
                            type="button"
                            aria-label="戻る"
                            disabled={!canGoBack}
                            onClick={() => void goBack()}
                        >
                            <span aria-hidden="true">↶</span>
                        </button>
                        <button
                            className="action-button action-like"
                            type="button"
                            aria-label="気になる"
                            disabled={!canSwipe}
                            onClick={() => void swipe("right")}
                        >
                            <span aria-hidden="true">♡</span>
                        </button>
                    </div>

                    {!canSwipe && (
                        <button
                            className="reset-button"
                            type="button"
                            onClick={() => void resetCards()}
                        >
                            もう一度見る
                        </button>
                    )}
                </div>
            </section>
        </main>
    )
}

export default MainPage
