import { Divider, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAnnouncement } from "../connection";

const Blogs = ({ searchText }) => {
  const [blogs, setBlogs] = useState([]);
  const announcements = useAnnouncement();

  useEffect(() => {
    const filteredBlogs = announcements?.data?.data.filter((blog) => {
      return (
        blog.title.toLowerCase().includes(searchText.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchText.toLowerCase())
      );
    });

    setBlogs(filteredBlogs);
  }, [announcements?.data?.data, searchText]);

  return (
    <Stack spacing={2} maxHeight={"95vh"} overflow={"scroll"}>
      {blogs?.map((blog) => (
        <Paper key={blog.id} sx={{ padding: 2 }}>
          <Typography variant="body" fontWeight={"bold"}>
            {blog.title}
          </Typography>
          <Divider sx={{ py: 0.5 }} />
          <Typography
            sx={{ p: 2 }}
            variant="body1"
            color="initial"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          <Divider sx={{ py: 0.5 }} />
          <Typography variant="caption" sx={{ py: 0.5 }}>
            {new Date(blog.createdAt).toLocaleDateString()}{" "}
            {new Date(blog.createdAt).toLocaleTimeString()}
          </Typography>
        </Paper>
      ))}
    </Stack>
  );
};

export default Blogs;
