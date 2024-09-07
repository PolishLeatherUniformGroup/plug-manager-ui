import { useRouter } from "next/navigation";

interface UploadFormProps {
    success: () => any;
}
const UploadForm = (props: UploadFormProps) => {
    const router = useRouter();

    const handleFileUpload = async (event: any) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        // Send formData to server-side endpoint
        const response = await fetch('/api/import', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            // File uploaded successfully
            props.success();
        } else {
            // Handle error
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileUpload} />
        </div>
    );
};

export default UploadForm;