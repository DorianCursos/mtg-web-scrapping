import TextArea from '../textarea/TextArea';
import { StyledForm } from './form.styles';

const Form = () => {
	return (
		<StyledForm onSubmit={formatFormInfo}>
			<TextArea name='info' />
			<button>GET CARDS</button>
		</StyledForm>
	);
};

const formatFormInfo = event => {
	event.preventDefault();
	const info = event.target.info.value;

	const lines = info.trim().split('\n');

	const arrayOfCards = lines.map(line => {
		const [amount, ...nameWords] = line.trim().split(' ');
		return { amount: Number(amount), name: nameWords.join(' ') };
	});

	console.log(arrayOfCards);
};
export default Form;

/* 
1 Command Tower
1 Dragonskull Summit
1 Exotic Orchard
*/
