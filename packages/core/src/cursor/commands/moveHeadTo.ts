import Editor from '../../Editor';
import Command from './Command';
import Transformation from '../Transformation';
import TranslateHead from '../operations/TranslateHead';

export default function moveHeadTo(position: number): Command {
  return (editor: Editor): Transformation => {
    const transformation = new Transformation();
    const editorCursor = editor.getEditorCursor();
    if (!editorCursor) {
      return transformation;
    }
    transformation.addOperation(new TranslateHead(position - editorCursor.getHead()));
    return transformation;
  };
}