import React, { useEffect, useState, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, Spinner, Image, Button, Form } from "react-bootstrap";

interface UserViewDto {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  description?: string;
  roleId: number;
  roleName?: string;
  image?: string; // có thể là "/uploads/..." hoặc "http://..." hoặc "uploads/..."
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

  const API_URL = import.meta.env.VITE_API_URL ?? window.location.origin;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get<UserViewDto>(`${API_URL}/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id, API_URL]);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  // Build full image URL robustly
  const buildImageUrl = (path?: string | null) => {
    if (!path) return "/images/default-avatar.png";
    try {
      // new URL(path, base) will produce full URL whether path is absolute ("/...") or relative ("uploads/...")
      return new URL(path, API_URL).toString();
    } catch {
      // fallback
      return path;
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    try {
      if (newPassword && newPassword !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      const token = localStorage.getItem("token");

      let imageUrl = user.image ?? null; // giữ ảnh cũ nếu không upload

      // 1) Upload file nếu có
      if (avatarFile) {
        const formData = new FormData();
        // backend upload controller nhận param name là "file"
        formData.append("file", avatarFile);

        const uploadRes = await axios.post(`${API_URL}/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        imageUrl = uploadRes.data.url; // ex: "/uploads/images/xxx.jpg"
      }

      // 2) Gọi API update profile (backend UpdateProfileAsync nhận dto.Email và dto.NewPassword)
      const updateRes = await axios.put(
        `${API_URL}/user/${id}/updateUserProfile`,
        {
          fullName: user.fullName,
          phoneNumber: user.phoneNumber,
          address: user.address,
          description: user.description,
          email: user.email, // gửi lại email (không cho phép sửa trên UI)
          image: imageUrl,
          newPassword: newPassword || null,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(updateRes.data);
      setEditMode(false);
      setAvatarFile(null);
      setAvatarPreview(null);
      setNewPassword("");
      setConfirmPassword("");
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
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
                <Form.Control type="file" accept="image/*" onChange={handleAvatarChange} />
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
            <strong>Email:</strong> {/* email không được sửa, luôn hiển thị text */}
            {" "}{user.email}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {editMode ? (
              <Form.Control
                type="text"
                value={user.phoneNumber || ""}
                onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
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
                onChange={(e) => setUser({ ...user, description: e.target.value })}
              />
            ) : (
              user.description
            )}
          </p>

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
            <strong>Role:</strong> {user.roleName}
          </p>
          <p>
            <strong>Status:</strong> {user.status === 1 ? "Active" : "Inactive"}
          </p>

          <div className="mt-3 text-center">
            {editMode ? (
              <>
                <Button variant="success" onClick={handleSaveProfile} className="me-2">
                  Save
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
