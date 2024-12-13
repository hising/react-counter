import "./App.css";
import { Counter } from "./ui/Counter.tsx";

function App() {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            <Counter start={43} end={17435} duration={2000} size="xs" color="blue" />
            <Counter start={0} end={1243} duration={2000} size="sm" color="green" />
            <Counter
                start={666}
                end={1337}
                duration={1000}
                size="md"
                color="orange"
                locale="en-GB"
            />
            <Counter start={0} end={99} duration={1000} size="lg" />
            <Counter
                start={900000}
                end={3500000}
                duration={3000}
                size="xl"
                color="red"
                locale={"sv-se"}
            />
        </div>
    );
}

export default App;
