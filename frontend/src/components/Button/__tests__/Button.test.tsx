import { render } from '../../../services/testing/reactTestingLibraryWrapper';
import { Button } from '../Button.style';

test('AAU, I can see a Button', () => {
  render(<Button />);
});

test('AAU, I can see a disabled Button', () => {
  render(<Button disabled />);
});
