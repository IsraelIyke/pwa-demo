"use client";

import { useState } from "react";

interface CounterProps {
  initialCount?: number;
}

export default function Counter({ initialCount = 0 }: CounterProps) {
  const [count, setCount] = useState<number>(initialCount);

  const increment = (): void => {
    setCount((prev) => prev + 1);
  };

  const decrement = (): void => {
    setCount((prev) => prev - 1);
  };

  const reset = (): void => {
    setCount(initialCount);
  };

  return (
    <div style={styles.counter}>
      <p style={styles.countText}>Count: {count}</p>
      <div style={styles.buttonGroup}>
        <button
          style={styles.button}
          onClick={decrement}
          aria-label="Decrement count"
        >
          Decrement
        </button>
        <button style={styles.button} onClick={reset} aria-label="Reset count">
          Reset
        </button>
        <button
          style={styles.button}
          onClick={increment}
          aria-label="Increment count"
        >
          Increment
        </button>
      </div>
    </div>
  );
}

const styles = {
  counter: {
    margin: "30px 0",
    textAlign: "center" as const,
  },
  countText: {
    fontSize: "1.5rem",
    fontWeight: "bold" as const,
    color: "#333",
    marginBottom: "20px",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    flexWrap: "wrap" as const,
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    minWidth: "100px",
  },
};
