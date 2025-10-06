import React, { useEffect, useState, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Container, Card, Spinner, Image, Button, Form } from "react-bootstrap";

interface JwtPayload {
  UserId?: number;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;
  exp?: number;
}
interface SavedJob {
  id: number;
  recruitmentId: number;
  jobTitle: string;
  companyName: string;
  categoryName: string;
}

interface UserViewDto {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  description?: string;
  roleId: number;
  roleName?: string;
  image?: string;
  status: number;
}

const UserProfilePage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [user, setUser] = useState<UserViewDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [uploading, setUploading] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [loadingSaved, setLoadingSaved] = useState(true);


  const API_URL = import.meta.env.VITE_API_URL ?? window.location.origin;

  // ✅ Decode token and extract UserId & Role
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: JwtPayload = jwt_decode(token);
        const role =
          decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        setUserRole(role || null);
        setUserId(decoded.UserId ? Number(decoded.UserId) : null);
        console.log("✅ Decoded token:", decoded);
      } catch (err) {
        console.error("Invalid token", err);
        setUserRole(null);
        setUserId(null);
      }
    }
  }, []);

  // ✅ Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      if (!userId && !id) return;
      try {
        const token = localStorage.getItem("token");
        const userTargetId = id ?? userId; // Ưu tiên param trên URL, fallback về token

        const res = await axios.get<UserViewDto>(`${API_URL}/user/${userTargetId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, id, API_URL]);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      if (!userId) return;
      try {
        const res = await axios.get(`${API_URL}/savejob/user/${userId}`);
        setSavedJobs(res.data);
      } catch (err) {
        console.error("❌ Failed to load saved jobs", err);
      } finally {
        setLoadingSaved(false);
      }
    };

    fetchSavedJobs();
  }, [userId, API_URL]);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const buildImageUrl = (path?: string | null) => {
    if (!path) return "/images/default-avatar.png";
    try {
      return new URL(path, API_URL).toString();
    } catch {
      return path;
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    if (newPassword && newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setUploading(true);
      const token = localStorage.getItem("token");
      let imageUrl = user.image ?? null;

      // 1️⃣ Upload avatar (nếu có)
      if (avatarFile) {
        const formData = new FormData();
        formData.append("file", avatarFile);

        const uploadRes = await axios.post(`${API_URL}/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        imageUrl = uploadRes.data.url;
      }

      // 2️⃣ Update profile
      const payload = {
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        address: user.address,
        description: user.description,
        image: imageUrl,
        newPassword: newPassword || null,
      };

      const updateRes = await axios.put(
        `${API_URL}/user/profile/${user.id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser(updateRes.data);
      setEditMode(false);
      setAvatarFile(null);
      setAvatarPreview(null);
      setNewPassword("");
      setConfirmPassword("");
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (!user) return <p>User not found</p>;

  return (
    <Container className="my-5">
      <Card>
        <Card.Header>User Profile</Card.Header>
        <Card.Body>
          <div className="text-center mb-3">
            <Image
              src={avatarPreview ?? buildImageUrl(user.image)}
              roundedCircle
              width={120}
              height={120}
              style={{ objectFit: "cover" }}
            />
            {editMode && (
              <Form.Group controlId="avatarUpload" className="mt-2">
                <Form.Label>Upload Avatar</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </Form.Group>
            )}
          </div>

          <p>
            <strong>Full Name:</strong>{" "}
            {editMode ? (
              <Form.Control
                type="text"
                value={user.fullName}
                onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              />
            ) : (
              user.fullName
            )}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {editMode ? (
              <Form.Control
                type="text"
                value={user.phoneNumber || ""}
                onChange={(e) =>
                  setUser({ ...user, phoneNumber: e.target.value })
                }
              />
            ) : (
              user.phoneNumber
            )}
          </p>

          <p>
            <strong>Address:</strong>{" "}
            {editMode ? (
              <Form.Control
                type="text"
                value={user.address || ""}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
              />
            ) : (
              user.address
            )}
          </p>

          <p>
            <strong>Description:</strong>{" "}
            {editMode ? (
              <Form.Control
                as="textarea"
                value={user.description || ""}
                onChange={(e) =>
                  setUser({ ...user, description: e.target.value })
                }
              />
            ) : (
              user.description
            )}
          </p>

          <hr />
          <h5 className="mt-4">Saved Jobs</h5>
          {loadingSaved ? (
            <Spinner animation="border" />
          ) : savedJobs.length === 0 ? (
            <p>You haven't saved any jobs yet.</p>
          ) : (
            <div className="mt-3">
              {savedJobs.map((job) => (
                <Card key={job.id} className="mb-2 p-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6>{job.jobTitle}</h6>
                      <p className="mb-0 text-muted">
                        {job.companyName} • {job.categoryName}
                      </p>
                    </div>
                    <div>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => window.location.href = `/job-single/${job.recruitmentId}`}
                      >
                        View Job
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}


          {editMode && (
            <>
              <p>
                <strong>New Password:</strong>{" "}
                <Form.Control
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </p>
              <p>
                <strong>Confirm Password:</strong>{" "}
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </p>
            </>
          )}

          <p>
            <strong>Role:</strong> {user.roleName ?? userRole}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {user.status === 1 ? "Active" : "Inactive"}
          </p>

          <div className="mt-3 text-center">
            {editMode ? (
              <>
                <Button
                  variant="success"
                  onClick={handleSaveProfile}
                  className="me-2"
                  disabled={uploading}
                >
                  {uploading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Save"
                  )}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setEditMode(false);
                    setNewPassword("");
                    setConfirmPassword("");
                    setAvatarFile(null);
                    setAvatarPreview(null);
                  }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="primary" onClick={() => setEditMode(true)}>
                Edit Profile
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserProfilePage;
