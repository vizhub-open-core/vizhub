import React, {
  useRef,
  useContext,
  useCallback,
  useState,
  useEffect
} from 'react';
import { FullSVG } from '../../../../../svg';
import { MiniOrMicroSVG } from '../../../../../mobileMods';
import {
  vizWidth,
  enterFullScreenTooltip,
  enterMiniModeTooltip
} from '../../../../../constants';
import { LargeIcon } from '../../../../styles';
import { VizRunnerContext } from '../../../VizRunnerContext';
import { RunContext } from '../../../RunContext';
import { URLStateContext } from '../../../URLStateContext';
import { useDimensions } from '../../useDimensions';
import {
  Wrapper,
  LargeIconRightmost,
  VizFrameFooter,
  VizFrameFooterRight
} from './styles';
import { PlayPauseControl } from './PlayPauseControl';

export const VizFrame = ({ vizHeight, scrollerRef, setWidth }) => {
  const wrapperRef = useRef();

  const { setVizRunnerTransform } = useContext(VizRunnerContext);
  const { enterFullScreen, enterMini } = useContext(URLStateContext);
  const [scale, setScale] = useState();
  const { runTimerProgress$ } = useContext(RunContext);
  const [runTimerProgress, setRunTimerProgress] = useState();

  useEffect(() => {
    const subscription = runTimerProgress$.subscribe(setRunTimerProgress);
    return () => subscription.unsubscribe();
  }, [runTimerProgress$]);

  const setDomRect = useCallback(
    ({ x, y, width }) => {
      const scale = width / vizWidth;
      setScale(scale);
      setVizRunnerTransform({ x, y, scale });
    },
    [setVizRunnerTransform, setScale]
  );

  const onWidthChanged = useCallback(() => {
    // This guard prevents a crash when navigating between viz pages.
    // The root cause is that a resize event is fired on navigation,
    // before the useEffect cleanup hook runs.
    if (wrapperRef.current) {
      setWidth(wrapperRef.current.clientWidth);
    }
  }, [setWidth]);

  useDimensions({ wrapperRef, scrollerRef, setDomRect, onWidthChanged });

  return (
    <Wrapper ref={wrapperRef}>
      {scale ? (
        <>
          <div style={{ height: vizHeight * scale }} />
          <VizFrameFooter>
            <LargeIcon
              leftmost={true}
              rightmost={true}
              onClick={enterMini}
              title={enterMiniModeTooltip}
            >
              <PlayPauseControl runTimerProgress={runTimerProgress} />
            </LargeIcon>
            <VizFrameFooterRight>
              <LargeIcon
                leftmost={true}
                onClick={enterMini}
                className="test-enter-mini-from-viewer"
                title={enterMiniModeTooltip}
              >
                <MiniOrMicroSVG />
              </LargeIcon>
              <LargeIconRightmost
                rightmost={true}
                onClick={enterFullScreen}
                className="test-enter-fullscreen-from-viewer"
                title={enterFullScreenTooltip}
              >
                <FullSVG />
              </LargeIconRightmost>
            </VizFrameFooterRight>
          </VizFrameFooter>
        </>
      ) : null}
    </Wrapper>
  );
};
