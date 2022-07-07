import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from "chart.js";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

// const score = [3,1,5,7,3,5,6,8,3,3,5,2]
// const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

const options = {
	fill: true,
	responsive: true,
	scales: {
		y: {
			min: 0,
		},
	},
};

export default function Graphic({ labels, score, text }) {
	const data = {
		datasets: [
			{
				label: text,
				data: score,
				tension: 0.3,
				borderColor: "rgb(37, 137, 232)",
				backgroundColor: "rgb(37, 137, 232, 0.3)",
			}
		],
		labels,
	};

	return <Line data={data} options={options} />;
}
