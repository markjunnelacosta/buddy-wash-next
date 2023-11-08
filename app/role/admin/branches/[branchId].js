import { useRouter } from 'next/navigation';
import BranchStaff from './branch-staff/page';

const Branch = () => {
  const router = useRouter();
  const { branchId } = router.query;

  return <BranchStaff branchId={branchId} />;
};

export default Branch;
