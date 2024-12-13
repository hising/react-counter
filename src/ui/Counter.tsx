import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import clsx from "clsx";
import styles from "./Counter.module.css";

type CounterSize = "xs" | "sm" | "md" | "lg" | "xl";
type CounterColor = "blue" | "green" | "red" | "orange" | "gray";

type EasingType = "linear" | "easeIn" | "easeOut" | "easeInOut";

interface CounterProps {
    start: number;
    end: number;
    duration?: number;
    size?: CounterSize;
    color?: CounterColor;
    locale?: string;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    easing?: EasingType | ((t: number) => number);
    trigger?: boolean;
    step?: number; // Incremental step size
    randomStep?: boolean; // Add randomness to steps
}

const predefinedEasings: Record<EasingType, (t: number) => number> = {
    linear: (t) => t,
    easeIn: (t) => t * t,
    easeOut: (t) => 1 - Math.pow(1 - t, 2),
    easeInOut: (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
};

export const Counter: React.FC<CounterProps> = ({
    start,
    end,
    duration = 2000,
    size = "md",
    color = "blue",
    locale = "en",
    decimals = 0,
    prefix = "",
    suffix = "",
    easing = "linear",
    trigger = true,
    step,
    randomStep = false,
}) => {
    const [countingFinished, setCountingFinished] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);

    const easingFunction = typeof easing === "string" ? predefinedEasings[easing] : easing;

    const calculateStep = (value: number) => {
        if (!step) return value; // Smooth animation
        const increment = step || 1;
        const randomFactor = randomStep ? Math.random() * 0.5 + 0.75 : 1; // Add randomness
        return Math.round(value / increment) * increment * randomFactor;
    };

    const { number } = useSpring({
        from: { number: start },
        to: { number: end },
        config: { duration, easing: easingFunction },
        reset: !trigger,
        onRest: () => {
            setCountingFinished(true);
            setShowAnimation(true);
        },
    });

    const formatNumber = (value: number) => {
        return new Intl.NumberFormat(locale, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        }).format(value);
    };

    return (
        <div className={styles.counterContainer}>
            {countingFinished && (
                <span
                    className={clsx(
                        styles.number,
                        styles.staticNumber,
                        styles[size],
                        styles[color]
                    )}
                >
                    {prefix}
                    {formatNumber(end)}
                    {suffix}
                </span>
            )}
            {showAnimation && (
                <span
                    className={clsx(
                        styles.number,
                        styles.animatedNumber,
                        styles[size],
                        styles[color]
                    )}
                >
                    {prefix}
                    {formatNumber(end)}
                    {suffix}
                </span>
            )}
            {!countingFinished && (
                <animated.span className={clsx(styles.number, styles.dull, styles[size])}>
                    {number.to((n) => `${prefix}${formatNumber(calculateStep(n))}${suffix}`)}
                </animated.span>
            )}
        </div>
    );
};
