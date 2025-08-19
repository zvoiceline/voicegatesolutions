import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
  getMetadata,
  UploadTask
} from 'firebase/storage';
import { storage } from '../lib/firebase';

export interface UploadProgress {
  bytesTransferred: number;
  totalBytes: number;
  progress: number;
}

export interface FileMetadata {
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
  path: string;
}

class StorageService {
  // Upload file with progress tracking
  uploadFile(
    file: File,
    path: string,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<{ url: string; metadata: FileMetadata }> {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = {
            bytesTransferred: snapshot.bytesTransferred,
            totalBytes: snapshot.totalBytes,
            progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          };
          onProgress?.(progress);
        },
        (error) => {
          reject(new Error(`Upload failed: ${error.message}`));
        },
        async () => {
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            const metadata: FileMetadata = {
              name: file.name,
              size: file.size,
              type: file.type,
              url,
              uploadedAt: new Date().toISOString(),
              path
            };
            resolve({ url, metadata });
          } catch (error: any) {
            reject(new Error(`Failed to get download URL: ${error.message}`));
          }
        }
      );
    });
  }

  // Upload resume for interpreter
  async uploadResume(
    file: File,
    userId: string,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<{ url: string; metadata: FileMetadata }> {
    const fileName = `${Date.now()}_${file.name}`;
    const path = `resumes/${userId}/${fileName}`;
    return this.uploadFile(file, path, onProgress);
  }

  // Upload additional documents for interpreter
  async uploadDocument(
    file: File,
    userId: string,
    documentType: 'certification' | 'identification' | 'other',
    onProgress?: (progress: UploadProgress) => void
  ): Promise<{ url: string; metadata: FileMetadata }> {
    const fileName = `${Date.now()}_${file.name}`;
    const path = `documents/${userId}/${documentType}/${fileName}`;
    return this.uploadFile(file, path, onProgress);
  }

  // Upload resource files (admin only)
  async uploadResource(
    file: File,
    category: 'onboarding' | 'training' | 'reference' | 'policy',
    onProgress?: (progress: UploadProgress) => void
  ): Promise<{ url: string; metadata: FileMetadata }> {
    const fileName = `${Date.now()}_${file.name}`;
    const path = `resources/${category}/${fileName}`;
    return this.uploadFile(file, path, onProgress);
  }

  // Upload profile images
  async uploadProfileImage(
    file: File,
    userId: string,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<{ url: string; metadata: FileMetadata }> {
    const fileName = `profile_${Date.now()}.${file.name.split('.').pop()}`;
    const path = `profiles/${userId}/${fileName}`;
    return this.uploadFile(file, path, onProgress);
  }

  // Simple upload without progress tracking
  async uploadFileSimple(file: File, path: string): Promise<string> {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (error: any) {
      throw new Error(`Upload failed: ${error.message}`);
    }
  }

  // Get download URL for existing file
  async getDownloadURL(path: string): Promise<string> {
    try {
      const storageRef = ref(storage, path);
      return await getDownloadURL(storageRef);
    } catch (error: any) {
      throw new Error(`Failed to get download URL: ${error.message}`);
    }
  }

  // Delete file
  async deleteFile(path: string): Promise<void> {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
    } catch (error: any) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }

  // Get file metadata
  async getFileMetadata(path: string): Promise<any> {
    try {
      const storageRef = ref(storage, path);
      return await getMetadata(storageRef);
    } catch (error: any) {
      throw new Error(`Failed to get file metadata: ${error.message}`);
    }
  }

  // List files in a directory
  async listFiles(path: string): Promise<FileMetadata[]> {
    try {
      const storageRef = ref(storage, path);
      const result = await listAll(storageRef);
      
      const files = await Promise.all(
        result.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          const metadata = await getMetadata(itemRef);
          
          return {
            name: itemRef.name,
            size: metadata.size || 0,
            type: metadata.contentType || 'unknown',
            url,
            uploadedAt: metadata.timeCreated || new Date().toISOString(),
            path: itemRef.fullPath
          } as FileMetadata;
        })
      );
      
      return files;
    } catch (error: any) {
      throw new Error(`Failed to list files: ${error.message}`);
    }
  }

  // Get user's uploaded files
  async getUserFiles(userId: string): Promise<{
    resumes: FileMetadata[];
    documents: FileMetadata[];
    profiles: FileMetadata[];
  }> {
    try {
      const [resumes, documents, profiles] = await Promise.all([
        this.listFiles(`resumes/${userId}`).catch(() => []),
        this.listFiles(`documents/${userId}`).catch(() => []),
        this.listFiles(`profiles/${userId}`).catch(() => [])
      ]);
      
      return { resumes, documents, profiles };
    } catch (error: any) {
      throw new Error(`Failed to get user files: ${error.message}`);
    }
  }

  // Validate file type and size
  validateFile(
    file: File,
    allowedTypes: string[],
    maxSizeInMB: number = 10
  ): { isValid: boolean; error?: string } {
    // Check file type
    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: `File type ${file.type} is not allowed. Allowed types: ${allowedTypes.join(', ')}`
      };
    }

    // Check file size
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      return {
        isValid: false,
        error: `File size ${(file.size / 1024 / 1024).toFixed(2)}MB exceeds maximum allowed size of ${maxSizeInMB}MB`
      };
    }

    return { isValid: true };
  }

  // Common file type validators
  static readonly ALLOWED_DOCUMENT_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ];

  static readonly ALLOWED_IMAGE_TYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp'
  ];

  static readonly ALLOWED_VIDEO_TYPES = [
    'video/mp4',
    'video/webm',
    'video/ogg'
  ];

  // Validate resume file
  validateResume(file: File): { isValid: boolean; error?: string } {
    return this.validateFile(file, StorageService.ALLOWED_DOCUMENT_TYPES, 5);
  }

  // Validate profile image
  validateProfileImage(file: File): { isValid: boolean; error?: string } {
    return this.validateFile(file, StorageService.ALLOWED_IMAGE_TYPES, 2);
  }

  // Validate document file
  validateDocument(file: File): { isValid: boolean; error?: string } {
    return this.validateFile(file, StorageService.ALLOWED_DOCUMENT_TYPES, 10);
  }
}

export const storageService = new StorageService();
export default storageService;