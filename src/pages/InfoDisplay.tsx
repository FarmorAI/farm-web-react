import { useEffect, useState } from "react";
import { fetchBlogData } from "../api/infoApi";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, Button, Container, Row, Col } from "react-bootstrap"; // ✅ Bootstrap 컴포넌트 추가

interface BlogPost {
    title: string;
    url: string;
    blogname: string;
    thumbnail: string;
    datetime: string;
}

interface InfoDisplayProps {
    query: string;
}

const InfoDisplay: React.FC<InfoDisplayProps> = ({ query }) => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchBlogData(query);
            setPosts(data);
        };
        loadData();
    }, [query]);

    const nextSlide = () => {
        setIndex((prev) => (prev + 1) % Math.max(posts.length - 4, 1));
    };

    const prevSlide = () => {
        setIndex((prev) => (prev - 1 + posts.length) % Math.max(posts.length - 4, 1));
    };

    return (
        <Container className="my-5">
            <h2 className="text-center mb-4">{query} 관련 블로그</h2>

            <div className="position-relative overflow-hidden">
                {/* 카드 컨테이너 */}
                <Row className="d-flex flex-nowrap transition-transform" style={{ transform: `translateX(-${index * 25}%)` }}>
                    {posts.slice(0, 20).map((post, idx) => (
                        <Col key={idx} md={3} className="px-2">
                            <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                <Card
                                    className="h-100 shadow-sm"
                                    style={{
                                        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
                                        (e.currentTarget as HTMLElement).style.boxShadow = "0px 8px 16px rgba(0, 0, 0, 0.2)";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                                    }}
                                >
                                    <Card.Img
                                        variant="top"
                                        src={post.thumbnail}
                                        alt={post.title}
                                        className="img-fluid"
                                    />

                                    <Card.Body>
                                        <Card.Title className="text-dark text-truncate">{post.title}</Card.Title>
                                        <Card.Text className="text-muted">{post.blogname}</Card.Text>
                                    </Card.Body>

                                    <Card.Footer className="text-muted small">
                                        {new Date(post.datetime).toLocaleDateString()}
                                    </Card.Footer>
                                </Card>
                            </a>
                        </Col>
                    ))}
                </Row>

                {posts.length > 4 && (
                    <>
                        <Button
                            variant="dark"
                            onClick={prevSlide}
                            className="position-absolute top-50 start-0 translate-middle-y"
                            style={{ zIndex: 10 }}
                        >
                            <ChevronLeft />
                        </Button>
                        <Button
                            variant="dark"
                            onClick={nextSlide}
                            className="position-absolute top-50 end-0 translate-middle-y"
                            style={{ zIndex: 10 }}
                        >
                            <ChevronRight />
                        </Button>
                    </>
                )}
            </div>
        </Container>
    );
};

export default InfoDisplay;
