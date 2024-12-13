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
    locale?: string; // Add locale prop for i18n formatting
}

export const Counter: React.FC<CounterProps> = ({
    start,
    end,
    duration = 2000,
    size = "md",
    color = "blue",
    locale = "en", // Default to English locale
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

    // Format numbers based on locale
    const formatNumber = (value: number) => {
        return new Intl.NumberFormat(locale, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className={styles.counterContainer}>
            {/* Final static number with vibrant color */}
            {countingFinished && (
                <span
                    className={clsx(
                        styles.staticNumber,
                        styles[size], // Apply size class
                        styles[color] // Apply color class
                    )}
                >
                    {formatNumber(end)}
                </span>
            )}

            {/* Animated zoom-out effect */}
            {showAnimation && (
                <span
                    className={clsx(
                        styles.animatedNumber,
                        styles[size], // Apply size class
                        styles[color] // Apply color class
                    )}
                >
                    {formatNumber(end)}
                </span>
            )}

            {/* Counting animation (dull color) */}
            {!countingFinished && (
                <animated.span
                    className={clsx(
                        styles.number,
                        styles.dull,
                        styles[size] // Apply size class
                    )}
                >
                    {/* Explicitly cast the interpolated value to a string */}
                    {number.to((n) => formatNumber(n)) as unknown as string}
                </animated.span>
            )}
        </div>
    );
};
