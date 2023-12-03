import { useCallback, useState } from 'react';
import DirectoryView from '@widgets/DirectoryView/DirectoryView';
import { useIdbStore } from '@shared/lib/idb/IdbStore';
import { Button, Flex } from 'antd';

// const buttonClasses =
//     'bg-blue-600 hover:bg-blue-700 transition hover:scale-105 text-white py-2 px-4 rounded-xl mb-4 mx-auto block';

function MainPage() {
    const root = useIdbStore((state) => state.root);
    const setRoot = useIdbStore((state) => state.setRoot);
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [error, setError] = useState(false);

    const onPermissionRequest = useCallback(async () => {
        try {
            // @ts-expect-error: bro doesn't know about FileSystemDirectoryHandle.requestPermission yet
            const permission = await root.requestPermission({
                mode: 'readwrite',
            });
            if (permission !== 'granted') {
                throw new Error('Permission was not granted');
            }
        } catch (e: unknown) {
            console.error(e);
            setError(true);
        } finally {
            setPermissionGranted(true);
        }
    }, [root]);

    const onChooseDirectoryClicked = useCallback(async () => {
        try {
            // @ts-expect-error: bro doesn't know about window.showDirectoryPicker yet
            const handle = await window.showDirectoryPicker({
                type: 'openDirectory',
            });
            await setRoot(handle);
            setError(false);
        } catch (e: unknown) {
            console.error(e);
            setError(true);
        }
    }, []);

    return (
        <main className="flex justify-center items-center bg-gray-100">
            <div className="w-full max-w-3xl bg-white shadow-md p-5 min-h-screen">
                <Flex className="gap-2 justify-center">
                    {root && !permissionGranted && (
                        <Button
                            className="bg-blue-500"
                            type="primary"
                            size="large"
                            onClick={onPermissionRequest}
                        >
                            Grant permission
                        </Button>
                    )}
                    <Button size="large" onClick={onChooseDirectoryClicked}>
                        Set new root
                    </Button>
                </Flex>
                {error ? (
                    <section className="flex flex-col items-center">
                        <h1 className="text-lg font-medium text-red-600">
                            Oops! Seems like there's an error
                        </h1>
                        <p className="text-gray-600">
                            See logs to find the issue
                        </p>
                    </section>
                ) : (
                    root &&
                    permissionGranted && (
                        <DirectoryView directoryHandle={root} />
                    )
                )}
            </div>
        </main>
    );
}

export default MainPage;
