import TaleWeaver from '../TaleWeaver';
import StateCommand from './StateCommand';
import Transformation from '../state/Transformation';
import Insert from '../state/transformationsteps/Insert';

export default function insertText(position: number, text: string): StateCommand {
  return (taleWeaver: TaleWeaver): Transformation => {
    const transformation = new Transformation();
    const tokens = text.split('');
    transformation.addStep(new Insert(position, tokens));
    return transformation;
  };
}
