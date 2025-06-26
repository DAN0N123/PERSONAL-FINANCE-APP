import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Icon from "./Icon";

export default function PaginationFooter({ totalPages, page, setPage }) {
  return (
    <div className="md:col-span-full">
      <Pagination
        count={totalPages}
        page={page}
        defaultPage={1}
        renderItem={(item) => (
          <PaginationItem
            slots={{
              previous: () => (
                <>
                  <Icon
                    variant="arrow-left"
                    className="md:hidden"
                    color="hsl(0, 0%, 41%)"
                    width="16px"
                    height="16px"
                  />
                  <div className="hidden md:flex w-full gap-[8px] justify-center items-center">
                    <Icon
                      variant="arrow-left"
                      color="hsl(0, 0%, 41%)"
                      width="12px"
                      height="12px"
                    />
                    <p>Prev</p>
                  </div>
                </>
              ),
              next: () => (
                <>
                  <Icon
                    variant="arrow-right"
                    className="md:hidden"
                    color="hsl(0, 0%, 41%)"
                    width="16px"
                    height="16px"
                  />
                  <div className="hidden md:flex w-full gap-[8px] justify-center items-center">
                    <p>Next</p>
                    <Icon
                      variant="arrow-right"
                      color="hsl(0, 0%, 41%)"
                      width="12px"
                      height="12px"
                    />
                  </div>
                </>
              ),
            }}
            {...item}
          />
        )}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          "& ul": {
            display: "flex",
            flexWrap: "nowrap",
            width: "100%",
            maxWidth: "700px",
            justifyContent: "center",
            gap: "4px",
          },
          "& ul li": {
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          "& .MuiPaginationItem-root": {
            flex: 1,
            borderRadius: "0.5rem",
            border: "1px solid #bdbdbd",
            height: "40px",
            fontWeight: 500,
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "#000",
            color: "#fff",
          },
          "& .MuiPaginationItem-ellipsis": {
            border: "1px solid #bdbdbd",
            borderRadius: "0.5rem",
            fontSize: "16px",
            color: "black",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
        onChange={(_, value) => setPage(value)}
        variant="outlined"
        shape="rounded"
        siblingCount={0}
        boundaryCount={1}
      />
    </div>
  );
}
