def count_size_in_queryset(queryset) -> int:
    """ Counts size of all files in queryset"""
    return sum([file.file.size for file in queryset])
