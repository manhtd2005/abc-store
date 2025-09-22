import TopCollection from "../components/collection/TopCollection";
import LeftCollection from "../components/collection/LeftCollection";
import RightCollection from "../components/collection/RightCollection";

const Collection = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-6">
                <TopCollection />
                <div className="flex gap-8">
                    <LeftCollection />
                    <RightCollection />
                </div>
            </div>
        </div>
    );
};

export default Collection;
