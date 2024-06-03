import TextArea from '../textarea/TextArea';
import { StyledForm } from './form.styles';

const Form = () => {
	return (
		<StyledForm onSubmit={formatFormInfo}>
			<label htmlFor='deck-name'>Deck Name</label>
			<input type='text' name='deck-name' />
			<TextArea name='info' />
			<button>GET CARDS</button>
		</StyledForm>
	);
};

const sendCardsInfo = async data => {
	try {
		console.log(data);

		const response = await fetch('http://localhost:3000/api/cards', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		const result = await response.json();
		console.log(result);
	} catch (error) {
		console.error('Error sending cards info:', error);
	}
};

const formatFormInfo = event => {
	event.preventDefault();
	const deckName = event.target['deck-name'].value;
	const info = event.target.info.value;

	const lines = info.trim().split('\n');

	const cards = lines.map(line => {
		const [amount, ...nameWords] = line.trim().split(' ');
		return { amount: Number(amount), name: nameWords.join(' ') };
	});

	const formattedData = {
		deckName,
		cards
	};

	sendCardsInfo(formattedData);
};

export default Form;

/* 
1 Command Tower
1 Dragonskull Summit
1 Exotic Orchard
*/
