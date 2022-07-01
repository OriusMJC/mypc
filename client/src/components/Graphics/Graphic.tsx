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

export default function Graphic({ labels, score, text, score2, text2 }) {
	const data = {
		datasets: [
			{
				label: text,
				data: score,
				tension: 0.3,
				borderColor: "rgb(45, 179, 11)",
				backgroundColor: "rgb(45, 179, 11, 0.3)",
			},
			{
				label: text2,
				data: score2,
				tension: 0.3,
				borderColor: "rgb(228, 191, 26)",
				backgroundColor: "rgb(228, 191, 26, 0.3)",
			},
		],
		labels,
	};

	return <Line data={data} options={options} />;
}
