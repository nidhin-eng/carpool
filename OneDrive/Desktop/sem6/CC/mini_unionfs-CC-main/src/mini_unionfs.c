#define FUSE_USE_VERSION 31

#include <fuse3/fuse.h>
#include <stdio.h>
#include <stdlib.h>
#include <limits.h>
#include <string.h>
#include <unistd.h>
#include <errno.h>
#include <sys/stat.h>

struct mini_unionfs_state {
    char lower_dir[PATH_MAX];
    char upper_dir[PATH_MAX];
};

#define UNIONFS_DATA ((struct mini_unionfs_state *) fuse_get_context()->private_data)

static void build_path(char *buf, const char *dir, const char *path)
{
    snprintf(buf, PATH_MAX, "%s%s", dir, path);
}

static int resolve_path(const char *path, char *resolved_path)
{
    struct mini_unionfs_state *st = UNIONFS_DATA;

    char upper[PATH_MAX];
    char lower[PATH_MAX];

    build_path(upper, st->upper_dir, path);
    build_path(lower, st->lower_dir, path);

    if (access(upper, F_OK) == 0) {
        strcpy(resolved_path, upper);
        return 0;
    }

    if (access(lower, F_OK) == 0) {
        strcpy(resolved_path, lower);
        return 0;
    }

    return -ENOENT;
}

/* -----------------------------
   getattr
----------------------------- */
static int unionfs_getattr(const char *path, struct stat *stbuf,
                           struct fuse_file_info *fi)
{
    (void) fi;

    char resolved[PATH_MAX];

    if (resolve_path(path, resolved) != 0)
        return -ENOENT;

    if (lstat(resolved, stbuf) == -1)
        return -errno;

    return 0;
}

static struct fuse_operations unionfs_oper = {
    .getattr = unionfs_getattr,
};

int main(int argc, char *argv[])
{
    struct mini_unionfs_state *state = malloc(sizeof(struct mini_unionfs_state));

    realpath(argv[1], state->lower_dir);
    realpath(argv[2], state->upper_dir);

    argv[1] = argv[3];
    argc = 2;

    return fuse_main(argc, argv, &unionfs_oper, state);
}