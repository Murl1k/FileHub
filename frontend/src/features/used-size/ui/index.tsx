import styles from './styles.module.scss';
import {SizeCalculate} from "../../../shared/lib/size-calculate.ts";
import {useGetUsedSizeQuery} from "../../../shared/api";

const UsedSize = () => {

    const {data, isLoading} = useGetUsedSizeQuery(null)

    const usedSizeClassNames = () => {
        if (!data) {
            return
        }

        if (data.used_size >= 7516192768) {
            return styles.mediumSize
        } else if (data.used_size >= 21474836480) {
            return styles.largeSize
        } else {
            return styles.lowSize
        }
    }

    return (
        <>
            {!isLoading &&
                <li className={`${styles.usedSize} ${usedSizeClassNames()}`}>
                    <span>{data ? SizeCalculate(data.used_size) : ''}</span>
                </li>
            }
        </>
    );
};

export default UsedSize;