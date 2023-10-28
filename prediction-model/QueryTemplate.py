def query_entry_criteria(keyword, cursor):
    query_template = "SELECT entry_criteria FROM programs_and_major where univ_name=%s and program_name=%s "
    # keyword = [university,program]
    cursor.execute(query_template, keyword)
    query_results = cursor.fetchall()

    entry_criteria = ''
    for r in query_results:
        entry_criteria = entry_criteria.join(str(r[0]))

    return entry_criteria


def query_program_summary(keyword, cursor):
    query_template = "SELECT programs_summary FROM programs_and_major where univ_name=%s and program_name=%s "
    cursor.execute(query_template, keyword)
    query_results = cursor.fetchall()

    program_summary = ''
    for r in query_results:
        program_summary = program_summary.join(str(r[0]))

    return program_summary
