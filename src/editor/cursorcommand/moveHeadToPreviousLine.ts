import TaleWeaver from '../TaleWeaver';
import CursorCommand from './CursorCommand';
import Transformation from '../cursor/Transformation';
import TranslateHead from '../cursor/transformationsteps/TranslateHead';
import moveHeadToLineStart from './moveHeadToLineStart';

export default function moveHeadToPreviousLine(): CursorCommand {
  return (taleWeaver: TaleWeaver): Transformation => {
    const transformation = new Transformation(true);
    const editorCursor = taleWeaver.getEditorCursor();
    if (!editorCursor) {
      return transformation;
    }
    const head = editorCursor.getHead();
    const docView = taleWeaver.getDocView();
    const viewAwarePosition = docView.resolveModelPosition(head);
    const previousLineView = viewAwarePosition.lineView.getPreviousLineView();
    if (!previousLineView) {
      return moveHeadToLineStart()(taleWeaver);
    }
    const editorCursorView = docView.getEditorCursorView();
    if (!editorCursorView) {
      return transformation;
    }
    let lineViewX: number;
    if (editorCursorView.getLineViewX() !== null) {
      lineViewX = editorCursorView.getLineViewX()!;
    } else {
      lineViewX = viewAwarePosition.lineView.mapModelPositionRangeToViewPositionBox(
        viewAwarePosition.lineViewPosition,
        viewAwarePosition.lineViewPosition,
      ).x1;
    }
    const previousLinePosition = previousLineView.mapViewPositionToModelPosition(lineViewX);
    transformation.addStep(new TranslateHead(0 - viewAwarePosition.lineViewPosition - previousLineView.getSize() + previousLinePosition));
    return transformation;
  };
}
