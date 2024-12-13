import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import clsx from "clsx";
import styles from "./Counter.module.css";

interface CounterProps {
    start: number;
    end: number;
    duration?: number; // Duration in milliseconds
}

export const Counter: React.FC<CounterProps> = ({ start, end, duration = 2000 }) => {
    const [countingFinished, setCountingFinished] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);

    // React Spring for counting animation
    const { number } = useSpring({
        from: { number: start },
        to: { number: end },
        config: { duration },
        onRest: () => {
            setCountingFinished(true); // Indicate counting is done
            setShowAnimation(true); // Trigger the end animation
        },
    });

    return (
        <div className={styles.counterContainer}>
            {/* Static number with gradient and outline, shown after counting */}
            {countingFinished && (
                <span className={clsx(styles.staticNumber, styles.gradientOutline)}>
          {end}
        </span>
            )}

            {/* Animated number with gradient zoom-out effect */}
            {showAnimation && (
                <span className={clsx(styles.animatedNumber, styles.gradientOutline)}>
          {end}
        </span>
            )}

            {/* Counting animation with dull color */}
            {!countingFinished && (
                <animated.span className={clsx(styles.number, styles.dull)}>
                    {number.to((n) => n.toFixed(0))}
                </animated.span>
            )}
        </div>
    );
};
