import classNames from 'classnames'

const commonClasses = 'block fixed z-[-2]'
const verticalLinesClass = 'bg-gray-100 h-full top-0 w-[1px]'
export const Lines = () => {
  return (
    <>
      <span
        className={classNames(commonClasses, verticalLinesClass, 'left-[10%]')}
      ></span>
      {/* Accent color line */}
      <span
        className={classNames(
          commonClasses,
          verticalLinesClass,
          'left-[14%] bg-blue-500 sm:bg-blue-500 z-[-1]'
        )}
      ></span>
      <span
        className={classNames(commonClasses, verticalLinesClass, 'left-[18%]')}
      ></span>
      <span
        className={classNames(commonClasses, verticalLinesClass, 'right-[30%]')}
      ></span>
      <span
        className={classNames(commonClasses, verticalLinesClass, 'right-[26%]')}
      ></span>
      <span
        className={classNames(commonClasses, verticalLinesClass, 'right-[6%]')}
      ></span>
      <span
        className={classNames(commonClasses, verticalLinesClass, 'right-[2%]')}
      ></span>
      {/* Horizontal line */}
      <span
        className={classNames(
          commonClasses,
          'bg-gray-100 w-full top-[45%] h-[1px]'
        )}
      ></span>
    </>
  )
}
