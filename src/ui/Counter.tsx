import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import clsx from "clsx";
import styles from "./Counter.module.css";

type CounterSize = "xs" | "sm" | "md" | "lg" | "xl";
type CounterColor = "blue" | "green" | "red" | "orange" | "gray";

interface CounterProps {
    start: number;
    end: number;
    duration?: number;
    size?: CounterSize;
    color?: CounterColor;
}

export const Counter: React.FC<CounterProps> = ({
    start,
    end,
    duration = 2000,
    size = "md",
    color = "blue",
}) => {
    const [countingFinished, setCountingFinished] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);

    const { number } = useSpring({
        from: { number: start },
        to: { number: end },
        config: { duration },
        onRest: () => {
            setCountingFinished(true);
            setShowAnimation(true);
        },
    });

    return (
        <div className={styles.counterContainer}>
            {/* Final static number with vibrant color */}
            {countingFinished && (
                <span
                    className={clsx(
                        styles.staticNumber,
                        styles[size], // Apply size class
                        styles[color] // Apply color class only after counting finishes
                    )}
                >
                    {end}
                </span>
            )}

            {/* Animated zoom-out effect */}
            {showAnimation && (
                <span
                    className={clsx(
                        styles.animatedNumber,
                        styles[size], // Apply size class
                        styles[color] // Apply color class for zoom-out animation
                    )}
                >
                    {end}
                </span>
            )}

            {/* Counting animation (dull color) */}
            {!countingFinished && (
                <animated.span
                    className={clsx(
                        styles.number,
                        styles.dull, // Always dull during counting
                        styles[size] // Apply size class
                    )}
                >
                    {number.to((n) => n.toFixed(0))}
                </animated.span>
            )}
        </div>
    );
};
