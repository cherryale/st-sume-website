import classNames from 'classnames'

const commonClasses = 'block z-[-2]'
const verticalLinesClass = 'bg-gray-100 h-full top-0 w-[1px]'
interface LinesProps {
  position?: 'fixed' | 'absolute'
  verticalOnly?: boolean
}
export const Lines = ({
  verticalOnly = false,
  position = 'fixed'
}: LinesProps) => {
  return (
    <>
      <span
        className={classNames(
          commonClasses,
          verticalLinesClass,
          position,
          'left-[6%]'
        )}
      />
      {/* Accent color line */}
      <span
        className={classNames(
          verticalLinesClass,
          position,
          'block z-[1]',
          'left-[9%] sm:bg-blue-500'
        )}
      />
      <span
        className={classNames(
          commonClasses,
          verticalLinesClass,
          position,
          'left-[12%]'
        )}
      />
      <span
        className={classNames(
          commonClasses,
          verticalLinesClass,
          position,
          'right-[30%]'
        )}
      />
      <span
        className={classNames(
          commonClasses,
          verticalLinesClass,
          position,
          'right-[26%]'
        )}
      />
      <span
        className={classNames(
          commonClasses,
          verticalLinesClass,
          position,
          'right-[7%]'
        )}
      />
      <span
        className={classNames(
          commonClasses,
          verticalLinesClass,
          position,
          'right-[3%]'
        )}
      />
      {/* Horizontal line */}
      {!verticalOnly && (
        <span
          className={classNames(
            'block absolute z-[-2]',
            'bg-gray-100 w-full bottom-[30%] h-[1px]'
          )}
        />
      )}
    </>
  )
}
